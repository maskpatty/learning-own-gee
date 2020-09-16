<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:template match="/">
		<soapenv:Envelope
			xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
			xmlns:ws="http://schema.cordys.com/schemas/class/WS_ATPCheck">
			<soapenv:Header></soapenv:Header>
			<soapenv:Body>
				<ws:checkPartsAvailability>
					<xsl:if test="checkPartsAvailability/countryOfBackOffice">
						<ws:countryOfBackOffice>
							<xsl:value-of select="checkPartsAvailability/countryOfBackOffice/text()"/>
						</ws:countryOfBackOffice>
					</xsl:if>
					<xsl:if test="checkPartsAvailability/backOfficeSystem">
						<ws:backOfficeSystem>
							<xsl:value-of select="checkPartsAvailability/backOfficeSystem/text()"/>
						</ws:backOfficeSystem>
					</xsl:if>
					<xsl:if test="checkPartsAvailability/partsOrder">
						<ws:PartsOrder>
							<xsl:if test="checkPartsAvailability/partsOrder/partOrderbFOID">
								<ws:partOrderbFOID>
									<xsl:value-of select="checkPartsAvailability/partsOrder/partOrderbFOID/text()"/>
								</ws:partOrderbFOID>
							</xsl:if>
							<xsl:for-each select = "checkPartsAvailability/partsOrder/partsOrderLine"> 
							<ws:PartsOrderLine>
								<xsl:if test = "expectedQuantity">
									<ws:expectedQuantity>
										<xsl:value-of select = "expectedQuantity"/>
									</ws:expectedQuantity>
								</xsl:if>
								<xsl:if test = "frontOfficeSkuReference">
									<ws:FOSKUReference>
										<xsl:value-of select = "frontOfficeSkuReference"/>
									</ws:FOSKUReference>
								</xsl:if>
								<xsl:if test = "partOrderbFOID">
									<ws:partOrderbFOID>
										<xsl:value-of select = "partOrderbFOID"/>
									</ws:partOrderbFOID>
								</xsl:if>
								<xsl:if test = "partOrderLinebFOID">
									<ws:partOrderLinebFOID>
										<xsl:value-of select = "partOrderLinebFOID"/>
									</ws:partOrderLinebFOID>
								</xsl:if>
								<xsl:if test = "partOrderLinebFONumber">
									<ws:partOrderLinebFONumber>
										<xsl:value-of select = "partOrderLinebFONumber"/>
									</ws:partOrderLinebFONumber>
								</xsl:if>
								<xsl:if test = "partOrderLineType">
									<ws:partOrderLineType>
										<xsl:value-of select = "partOrderLineType"/>
									</ws:partOrderLineType>
								</xsl:if>
								<xsl:if test = "plantName">
									<ws:plantName>
										<xsl:value-of select = "plantName"/>
									</ws:plantName>
								</xsl:if>
								<xsl:if test = "requestedDate">
									<ws:requestedDate>
										<xsl:value-of select = "requestedDate"/>
									</ws:requestedDate>
								</xsl:if>
								<xsl:if test = "sparePartbFOID">
									<ws:sparePartbFOID>
										<xsl:value-of select = "sparePartbFOID"/>
									</ws:sparePartbFOID>
								</xsl:if>
								<xsl:if test = "searchForRefurbished">
									<ws:searchForRefurbished>
										<xsl:value-of select = "searchForRefurbished/text()"/>
									</ws:searchForRefurbished>
								</xsl:if>
								<xsl:if test = "unitOfMeasure">
									<ws:unitOfMeasure>
										<xsl:value-of select = "unitOfMeasure"/>
									</ws:unitOfMeasure>
								</xsl:if>
							</ws:PartsOrderLine>
							</xsl:for-each>
							<xsl:if test="checkPartsAvailability/partsOrder/shipToAccount">
								<ws:shipToAccount>
									<xsl:if test="checkPartsAvailability/partsOrder/shipToAccount/addAddressInfo">
										<ws:AddAddressInfo>
											<xsl:value-of select="checkPartsAvailability/partsOrder/shipToAccount/addAddressInfo/text()"/>
										</ws:AddAddressInfo>
									</xsl:if>
									<xsl:if test="checkPartsAvailability/partsOrder/shipToAccount/addAddressInfoLocal">
										<ws:AddAddressInfoLocal>
											<xsl:value-of select="checkPartsAvailability/partsOrder/shipToAccount/addAddressInfoLocal/text()"/>
										</ws:AddAddressInfoLocal>
									</xsl:if>
									<xsl:if test="checkPartsAvailability/partsOrder/shipToAccount/city">
										<ws:City>
											<xsl:value-of select="checkPartsAvailability/partsOrder/shipToAccount/city/text()"/>
										</ws:City>
									</xsl:if>
									<xsl:if test="checkPartsAvailability/partsOrder/shipToAccount/countryCode">
										<ws:CountryCode>
											<xsl:value-of select="checkPartsAvailability/partsOrder/shipToAccount/countryCode/text()"/>
										</ws:CountryCode>
									</xsl:if>
									<xsl:if test="checkPartsAvailability/partsOrder/shipToAccount/goldenID">
										<ws:GoldenID>
											<xsl:value-of select="checkPartsAvailability/partsOrder/shipToAccount/goldenID/text()"/>
										</ws:GoldenID>
									</xsl:if>
									<xsl:if test="checkPartsAvailability/partsOrder/shipToAccount/localCity">
										<ws:LocalCity>
											<xsl:value-of select="checkPartsAvailability/partsOrder/shipToAccount/localCity/text()"/>
										</ws:LocalCity>
									</xsl:if>
									<xsl:if test="checkPartsAvailability/partsOrder/shipToAccount/name">
										<ws:Name>
											<xsl:value-of select="checkPartsAvailability/partsOrder/shipToAccount/name/text()"/>
										</ws:Name>
									</xsl:if>
									<xsl:if test="checkPartsAvailability/partsOrder/shipToAccount/nameLocal">
										<ws:NameLocal>
											<xsl:value-of select="checkPartsAvailability/partsOrder/shipToAccount/nameLocal/text()"/>
										</ws:NameLocal>
									</xsl:if>
									<xsl:if test="checkPartsAvailability/partsOrder/shipToAccount/stateProvinceCode">
										<ws:StateProvinceCode>
											<xsl:value-of select="checkPartsAvailability/partsOrder/shipToAccount/stateProvinceCode/text()"/>
										</ws:StateProvinceCode>
									</xsl:if>
									<xsl:if test="checkPartsAvailability/partsOrder/shipToAccount/street">
										<ws:Street>
											<xsl:value-of select="checkPartsAvailability/partsOrder/shipToAccount/street/text()"/>
										</ws:Street>
									</xsl:if>
									<xsl:if test="checkPartsAvailability/partsOrder/shipToAccount/streetLocal">
										<ws:StreetLocal>
											<xsl:value-of select="checkPartsAvailability/partsOrder/shipToAccount/streetLocal/text()"/>
										</ws:StreetLocal>
									</xsl:if>
									<xsl:if test="checkPartsAvailability/partsOrder/shipToAccount/zipCode">
										<ws:ZipCode>
											<xsl:value-of select="checkPartsAvailability/partsOrder/shipToAccount/zipCode/text()"/>
										</ws:ZipCode>
									</xsl:if>
								</ws:shipToAccount>
							</xsl:if>
							<xsl:if test="checkPartsAvailability/partsOrder/workOrderBackOfficeReference">
								<ws:WOBackOfficeReference>
									<xsl:value-of select="checkPartsAvailability/partsOrder/workOrderBackOfficeReference/text()"/>
								</ws:WOBackOfficeReference>
							</xsl:if>
						</ws:PartsOrder>
					</xsl:if>
				</ws:checkPartsAvailability>
			</soapenv:Body>
		</soapenv:Envelope>
	</xsl:template>
</xsl:stylesheet>