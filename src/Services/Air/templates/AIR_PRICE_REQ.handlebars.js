module.exports = `
<!--Release 8.1-->
<!--Version Dated as of 15/Apr/2015 11:24:06-->
<!--Air Pricing For Galileo({{provider}}) with LFS CheckFlightDetails Request-->
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
    <soap:Header/>
    <soap:Body>
        <air:AirPriceReq AuthorizedBy="user" TargetBranch="{{TargetBranch}}" TraceId="{{requestId}}" {{#if fetchFareRules}} FareRuleType="{{#if long}}long{{else}}short{{/if}}" {{/if}} xmlns:air="http://www.travelport.com/schema/air_v52_0" xmlns:com="http://www.travelport.com/schema/common_v52_0">
            <com:BillingPointOfSaleInfo OriginApplication="UAPI"/>
            <air:AirItinerary>
                {{#segments}}
                <air:AirSegment ArrivalTime="{{arrival}}" DepartureTime="{{departure}}" Carrier="{{airline}}" {{#if bookingClass}} ClassOfService="{{bookingClass}}" {{/if}} CabinClass="{{serviceClass}}" Origin="{{from}}" Destination="{{to}}" ETicketability="Yes" Equipment="{{plane}}" FlightNumber="{{flightNumber}}" LinkAvailability="true" PolledAvailabilityOption="Polled avail exists" ProviderCode="{{../provider}}" Key="{{@index}}" {{#if hostToken}} HostTokenRef="HT_{{@index}}" {{/if}} Group="{{group}}">
                    {{#if transfer}}
                    <air:Connection/>
                    {{/if}}
                </air:AirSegment>
                {{/segments}}
                {{#segments}}
                {{#if hostToken}}
                <com:HostToken Key="HT_{{@index}}">{{hostToken}}</com:HostToken>
                {{/if}}
                {{/segments}}
            </air:AirItinerary>
            {{#if platingCarrier}}
              <air:AirPricingModifiers PlatingCarrier="{{platingCarrier}}"/>
            {{/if}}
            {{#if business}}
            <air:AirPricingModifiers>
                <air:PermittedCabins>
                    <com:CabinClass Type="Business"/>
                </air:PermittedCabins>
            </air:AirPricingModifiers>
            {{else}}
            <air:AirPricingModifiers/>
            {{/if}}
            {{#passengers}}
            <com:SearchPassenger Key="P_{{@index}}" Code="{{ageCategory}}" {{#if child}}Age="9"{{else if Age}}Age="{{Age}}"{{/if}}/>
            {{/passengers}}
            <air:AirPricingCommand>
                {{#segments}}
                <air:AirSegmentPricingModifiers AirSegmentRef="{{@index}}"{{#if fareBasisCode}} FareBasisCode="{{fareBasisCode}}"{{/if}}>
                {{#if bookingClass}}
                    <air:PermittedBookingCodes>
                        <air:BookingCode Code="{{bookingClass}}" />
                    </air:PermittedBookingCodes>
                {{/if}}
                </air:AirSegmentPricingModifiers>
                {{/segments}}
            </air:AirPricingCommand>
            <air:OptionalServices>
            {{#optionalServices}}
                <air:OptionalService Key="O_{{@index}}" Type="{{Type}}" TotalPrice="{{TotalPrice}}" SupplierCode="{{SupplierCode}}" ServiceStatus="Offered" Source="{{Source}}" Quantity="{{Quantity}}" ProviderDefinedType="{{ProviderDefinedType}}" BasePrice="{{BasePrice}}" ApproximateTotalPrice="{{ApproximateTotalPrice}}" IsRepriceRequired="false" PurchaseWindow="BookingOnly">
                {{#refs}}
                    <com:ServiceData AirSegmentRef="{{segment}}" BookingTravelerRef="P_{{passenger}}" {{#if data}}Data="{{data}}"{{/if}}/>
                {{/refs}}
                </air:OptionalService>
            {{/optionalServices}}
            </air:OptionalServices>
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
            {{#if emulatePcc}}
            <air:PCC>
                <com:OverridePCC ProviderCode="{{provider}}" PseudoCityCode="{{emulatePcc}}"/>
            </air:PCC>
            {{/if}}
        </air:AirPriceReq>
    </soap:Body>
</soap:Envelope>
`;
