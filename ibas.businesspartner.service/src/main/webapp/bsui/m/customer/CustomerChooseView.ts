/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace businesspartner {
    export namespace ui {
        export namespace m {
            export class CustomerChooseView extends ibas.BOChooseView implements app.ICustomerChooseView {
                /** 返回查询的对象 */
                get queryTarget(): any {
                    return bo.Customer;
                }
                /** 绘制视图 */
                draw(): any {
                    let that: this = this;
                    this.list = new sap.extension.m.List("", {
                        chooseType: this.chooseType,
                        growingThreshold: sap.extension.table.visibleRowCount(15),
                        mode: sap.m.ListMode.SingleSelectMaster,
                        items: {
                            path: "/rows",
                            template: new sap.m.ObjectListItem("", {
                                title: "{name} ({code})",
                                attributes: [
                                    new sap.extension.m.RepositoryObjectAttribute("", {
                                        title: ibas.i18n.prop("bo_customer_group"),
                                        text: "{group}",
                                        repository: bo.BORepositoryBusinessPartner,
                                        dataInfo: {
                                            type: bo.BusinessPartnerGroup,
                                            key: bo.BusinessPartnerGroup.PROPERTY_CODE_NAME,
                                            text: bo.BusinessPartnerGroup.PROPERTY_NAME_NAME
                                        },
                                    }),
                                    new sap.m.ObjectAttribute("", {
                                        title: ibas.i18n.prop("bo_customer_channel"),
                                        text: "{channel}"
                                    }),
                                    new sap.extension.m.RepositoryObjectAttribute("", {
                                        title: ibas.i18n.prop("bo_customer_organizationalunit"),
                                        text: "{organizationalunit}",
                                        repository: initialfantasy.bo.BORepositoryInitialFantasy,
                                        dataInfo: {
                                            type: initialfantasy.bo.Organization,
                                            key: initialfantasy.bo.Organization.PROPERTY_CODE_NAME,
                                            text: initialfantasy.bo.Organization.PROPERTY_NAME_NAME
                                        },
                                    }),
                                ]
                            })
                        },
                        nextDataSet(event: sap.ui.base.Event): void {
                            // 查询下一个数据集
                            let data: any = event.getParameter("data");
                            if (ibas.objects.isNull(data)) {
                                return;
                            }
                            if (ibas.objects.isNull(that.lastCriteria)) {
                                return;
                            }
                            let criteria: ibas.ICriteria = that.lastCriteria.next(data);
                            if (ibas.objects.isNull(criteria)) {
                                return;
                            }
                            ibas.logger.log(ibas.emMessageLevel.DEBUG, "result: {0}", criteria.toString());
                            that.fireViewEvents(that.fetchDataEvent, criteria);
                        }
                    });
                    return new sap.extension.m.Dialog("", {
                        title: this.title,
                        type: sap.m.DialogType.Standard,
                        state: sap.ui.core.ValueState.None,
                        horizontalScrolling: true,
                        verticalScrolling: true,
                        content: [
                            this.list
                        ],
                        buttons: [
                            new sap.m.Button("", {
                                text: ibas.i18n.prop("shell_data_choose"),
                                type: sap.m.ButtonType.Transparent,
                                press: function (): void {
                                    that.fireViewEvents(that.chooseDataEvent, that.list.getSelecteds());
                                }
                            }),
                            new sap.m.Button("", {
                                text: ibas.i18n.prop("shell_exit"),
                                type: sap.m.ButtonType.Transparent,
                                press: function (): void {
                                    that.fireViewEvents(that.closeEvent);
                                }
                            }),
                        ]
                    });
                }
                private list: sap.extension.m.List;
                /** 显示数据 */
                showData(datas: bo.Customer[]): void {
                    let model: sap.ui.model.Model = this.list.getModel();
                    if (model instanceof sap.extension.model.JSONModel) {
                        // 已绑定过数据
                        model.addData(datas);
                    } else {
                        // 未绑定过数据
                        this.list.setModel(new sap.extension.model.JSONModel({ rows: datas }));
                    }
                    this.list.setBusy(false);
                }
                /** 记录上次查询条件，表格滚动时自动触发 */
                query(criteria: ibas.ICriteria): void {
                    super.query(criteria);
                    // 清除历史数据
                    if (this.isDisplayed) {
                        this.list.setBusy(true);
                        this.list.setModel(null);
                    }
                }
            }
        }
    }
}