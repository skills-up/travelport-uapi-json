module.exports = `
<soapenv:Envelope
  xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
  xmlns:air="http://www.travelport.com/schema/air_v52_0"
  xmlns:com="http://www.travelport.com/schema/common_v52_0"
  xmlns:univ="http://www.travelport.com/schema/universal_v52_0"
  >
  <soapenv:Header/>
  <soapenv:Body>
    <univ:UniversalRecordModifyReq AuthorizedBy="user" TargetBranch="{{TargetBranch}}" Version="{{version}}">
      <com:BillingPointOfSaleInfo OriginApplication="UAPI"/>
      {{#if emulatePcc}}
        <com:OverridePCC ProviderCode="{{provider}}" PseudoCityCode="{{emulatePcc}}"/>
      {{/if}}
      <univ:RecordIdentifier ProviderCode="{{provider}}" ProviderLocatorCode="{{pnr}}" UniversalLocatorCode="{{universalRecordLocatorCode}}"/>
      <univ:UniversalModifyCmd Key="BOOKING_MODIFY_SEGMENTS"> 
        <univ:AirAdd ReservationLocatorCode="{{reservationLocatorCode}}" > 
          {{#segments}}
          <air:AirSegment
            ArrivalTime="{{arrival}}"
            DepartureTime="{{departure}}"
            Carrier="{{airline}}"
            {{#if bookingClass}} ClassOfService="{{bookingClass}}" {{/if}}
            CabinClass="{{serviceClass}}"
            Origin="{{from}}"
            Destination="{{to}}"
            ETicketability="Yes"
            Equipment="{{plane}}"
            FlightNumber="{{flightNumber}}"
            LinkAvailability="true"
            PolledAvailabilityOption="Polled avail exists"
            ProviderCode="{{../provider}}"
            Key="{{@index}}"
            Group="{{group}}"
          >
            {{#if transfer}}
            <air:Connection/>
            {{/if}}
          </air:AirSegment>
          {{/segments}}
        {{#with payment}}
          {{#if amount}}
          <air:AirPricingPayment>
            <com:Payment Amount="{{amount}}" FormOfPaymentRef="FOP_1" Type="Passenger"/>
            {{#equal type "AgencyPayment"}}
            <com:FormOfPayment Key="FOP_1" Type="AgencyPayment">
                <com:AgencyPayment AgencyBillingIdentifier="{{agency.identifier}}" AgencyBillingPassword="{{agency.password}}"/>
            </com:FormOfPayment>
            {{/equal}}
            {{#equal type "CreditCard"}}
            <com:FormOfPayment Key="FOP_1" Type="Credit">
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
            <air:AirPricingInfoRef Key="APIR_1"/>
          </air:AirPricingPayment>
          {{/if}}
        {{/with}}
        </univ:AirAdd>
      </univ:UniversalModifyCmd>
    </univ:UniversalRecordModifyReq>
  </soapenv:Body>
</soapenv:Envelope>
`;
