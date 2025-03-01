module.exports = `
<!--AirCreateReservationReq-->
<!--Release 8.1-->
<!--Version Dated as of 15/Apr/2015 11:24:07-->
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
    <soap:Header xmlns:univ="http://www.travelport.com/schema/universal_v52_0">
        <univ:SupportedVersions airVersion="air_v52_0"/>
    </soap:Header>
    <soap:Body>
        <univ:AirCreateReservationReq
            AuthorizedBy="user" TraceId="{{requestId}}"
            RetainReservation="None" TargetBranch="{{TargetBranch}}"
            {{#if rule}}RuleName="{{rule}}"{{/if}}
            {{#if UniversalRecordLocatorCode}} UniversalRecordLocatorCode="{{UniversalRecordLocatorCode}}" {{/if}}
            {{#if allowWaitlist}}RestrictWaitlist="false"{{else}}RestrictWaitlist="true"{{/if}}
            xmlns:univ="http://www.travelport.com/schema/universal_v52_0"
            xmlns:com="http://www.travelport.com/schema/common_v52_0"
            xmlns:air="http://www.travelport.com/schema/air_v52_0"
            xmlns:common_v52_0="http://www.travelport.com/schema/common_v52_0">
            <com:BillingPointOfSaleInfo OriginApplication="uAPI" />
            {{#if emulatePcc}}
            <com:OverridePCC ProviderCode="{{provider}}" PseudoCityCode="{{emulatePcc}}"/>
            {{/if}}
            {{#each passengers}}
            <com:BookingTraveler Key="P_{{@index}}" Age="{{Age}}" DOB="{{birthDate}}" Gender="{{gender}}" TravelerType="{{ageCategory}}">
                <com:BookingTravelerName First="{{firstName}}" Last="{{lastName}}" {{#if title}}Prefix="{{title}}"{{/if}}/>
                {{#if ../deliveryInformation}}
                <com:DeliveryInfo>
                    <com:ShippingAddress>
                        <com:AddressName>{{ ../deliveryInformation.name}}</com:AddressName>
                        <com:Street>{{ ../deliveryInformation.street}}</com:Street>
                        <com:City>{{ ../deliveryInformation.city}}</com:City>
                        <com:PostalCode>{{ ../deliveryInformation.zip}}</com:PostalCode>
                        <com:Country>{{ ../deliveryInformation.country}}</com:Country>
                    </com:ShippingAddress>
                </com:DeliveryInfo>
                {{/if}}
                {{#if phone}}
                    <com:PhoneNumber Number="{{phone.number}}" Type="{{phone.type}}"/>
                {{/if}}
                {{#if email}}
                    <com:Email EmailID="{{email}}" Type="P"/>
                {{else}}
                    <com:Email EmailID="support@xplorz.com" Type="P"/>
                {{/if}}
                {{#ssr}}
                    {{#equal type "FQTV"}}
                        <com:LoyaltyCard Key="P_{{@index}}_FQTV" SupplierType="Air" SupplierCode="{{carrier}}" CardNumber="{{text}}" />
                    {{else}}
                        <com:SSR Type="{{type}}"{{#if carrier}} Carrier="{{carrier}}"{{/if}}{{#if segmentRef}} SegmentRef="{{{segmentRef}}}"{{/if}}{{#if status}} Status="{{{status}}}"{{/if}} FreeText="{{text}}" />
                    {{/equal}}
                {{/ssr}}
                {{#if address}}
                    <com:Address>
                        <com:AddressName>{{address.name}}</com:AddressName>
                        <com:Street>{{address.street}}</com:Street>
                        <com:City>{{address.city}}</com:City>
                        <com:PostalCode>{{address.zip}}</com:PostalCode>
                        <com:Country>{{address.country}}</com:Country>
                    </com:Address>
                {{/if}}
                {{#if isChild}}
                <com:NameRemark Key="P_{{@index}}">
                    <com:RemarkData>P-{{ageCategory}} DOB{{dobString}}</com:RemarkData>
                </com:NameRemark>
                {{/if}}
            </com:BookingTraveler>
            {{/each}}

            {{#if overrideContinuityCheck}}<com:ContinuityCheckOverride>yes</com:ContinuityCheckOverride>{{/if}}

        {{#with payment}}
            {{#equal type "AgencyPayment"}}
            <com:FormOfPayment Type="AgencyPayment">
                <com:AgencyPayment AgencyBillingIdentifier="{{agency.identifier}}" AgencyBillingPassword="{{agency.password}}"/>
            </com:FormOfPayment>
            {{/equal}}
            {{#equal type "CreditCard"}}
            <com:FormOfPayment Type="Credit">
                {{#with creditCard}}
                <com:CreditCard BankCountryCode="{{country}}" BankName="{{bank}}" CVV="{{cvv}}" ExpDate="{{expiry}}" Name="{{name}}" Number="{{number}}" Type="{{issuer}}">
                {{/with}}
                    {{#with billngAddress}}
                    <com:BillingAddress>
                        <com:AddressName>{{name}}</com:AddressName>
                        <com:Street>{{street}}</com:Street>
                        <com:City>{{city}}</com:City>
                        <com:State>{{state}}</com:State>
                        <com:PostalCode>{{pin}}</com:PostalCode>
                        <com:Country>{{country}}</com:Country>
                    </com:BillingAddress>
                    {{/with}}
                </com:CreditCard>
            </com:FormOfPayment>
            {{/equal}}
        {{/with}}

            <air:AirPricingSolution {{#each air:AirPricingSolution}}{{@key}}="{{{this}}}" {{/each}}>
                {{{air:AirPricingSolution_XML.air:AirSegment_XML}}}
                {{{air:AirPricingSolution_XML.air:AirPricingInfo_XML}}}
                {{{air:AirPricingSolution_XML.air:FareNote_XML}}}
                {{{air:AirPricingSolution_XML.common_v52_0:HostToken_XML}}}
            </air:AirPricingSolution>

            <com:ActionStatus Type="ACTIVE" TicketDate="{{ticketDate}}" ProviderCode="{{provider}}"/>

        </univ:AirCreateReservationReq>
    </soap:Body>
</soap:Envelope>
`;
