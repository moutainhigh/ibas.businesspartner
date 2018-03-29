package org.colorcoding.ibas.businesspartner.logic;

import org.colorcoding.ibas.bobas.data.Decimal;
import org.colorcoding.ibas.bobas.data.emDirection;
import org.colorcoding.ibas.bobas.logic.IBusinessLogicContract;

/**
 * 业务伙伴资产剩余价值契约
 * 
 * @author Niuren.Zhu
 *
 */
public interface IBusinessPartnerAssetAmountContract extends IBusinessLogicContract {
	/**
	 * 业务伙伴资产码
	 * 
	 * @return 值
	 */
	String getServiceCode();

	/**
	 * 方向
	 * 
	 * @return 值
	 */
	emDirection getDirection();

	/**
	 * 交易额
	 * 
	 * @return 值
	 */
	Decimal getAmount();

}
