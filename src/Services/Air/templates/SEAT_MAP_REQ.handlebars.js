module.exports = `
<!--Release 8.1-->
<!--Version Dated as of 15/Apr/2015 11:24:06-->
<!--Seat Map For Galileo({{provider}}) with LFS CheckFlightDetails Request-->
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
    <soap:Header/>
    <soap:Body>
        <air:SeatMapReq AuthorizedBy="user" TargetBranch="{{TargetBranch}}" TraceId="{{requestId}}" ReturnSeatPricing="true" ReturnBrandingInfo="true" xmlns:air="http://www.travelport.com/schema/air_v52_0" xmlns:com="http://www.travelport.com/schema/common_v52_0">
            <com:BillingPointOfSaleInfo OriginApplication="UAPI"/>
            {{#segments}}
            <air:AirSegment ArrivalTime="{{arrival}}" DepartureTime="{{departure}}" Carrier="{{airline}}"{{#if bookingClass}} ClassOfService="{{bookingClass}}"{{/if}} CabinClass="{{serviceClass}}" Origin="{{from}}" Destination="{{to}}" FlightNumber="{{flightNumber}}" ProviderCode="{{../provider}}" Key="{{@index}}"{{#if hostToken}} HostTokenRef="HT_{{@index}}"{{/if}} Group="{{group}}">
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
            {{#passengers}}
            {{#equal ageCategory "INF"}}
            {{else}}
            <air:SearchTraveler Key="P_{{@index}}" Code="{{ageCategory}}"{{#if age}} Age="{{age}}"{{else}}{{#equal ageCategory "CHD"}} Age="9"{{/equal}}{{/if}}{{#if gender}} Gender="{{gender}}"{{/if}}{{#if nationality}} Nationality="{{nationality}}"{{/if}}>
                <com:Name Prefix="{{title}}" First="{{firstName}}" Last="{{lastName}}"/>
            </air:SearchTraveler>
            {{/equal}}
            {{/passengers}}
        </air:SeatMapReq>
    </soap:Body>
</soap:Envelope>
`;
