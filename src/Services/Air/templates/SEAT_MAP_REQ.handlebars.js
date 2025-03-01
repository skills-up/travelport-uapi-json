module.exports = `
<!--Release 8.1-->
<!--Version Dated as of 15/Apr/2015 11:24:06-->
<!--Seat Map For Galileo({{provider}}) with LFS CheckFlightDetails Request-->
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
    <soap:Header/>
    <soap:Body>
        <air:SeatMapReq AuthorizedBy="user" TargetBranch="{{TargetBranch}}" TraceId="{{requestId}}" ReturnSeatPricing="true" ReturnBrandingInfo="true" xmlns:air="http://www.travelport.com/schema/air_v52_0" xmlns:com="http://www.travelport.com/schema/common_v52_0">
            <com:BillingPointOfSaleInfo OriginApplication="uAPI"/>
            {{#segments}}
            <air:AirSegment Key="{{@index}}" Group="{{group}}" Carrier="{{airline}}" FlightNumber="{{flightNumber}}" ProviderCode="{{../provider}}" Origin="{{from}}" Destination="{{to}}" DepartureTime="{{departure}}" ArrivalTime="{{arrival}}"{{#if bookingClass}} ClassOfService="{{bookingClass}}"{{/if}}{{#if hostToken}} HostTokenRef="HT_{{@index}}"{{/if}}>
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
            <air:SearchTraveler Key="P_{{@index}}" Code="{{ageCategory}}">
                <com:Name Prefix="{{title}}" First="{{firstName}}" Last="{{lastName}}"/>
            </air:SearchTraveler>
            {{/equal}}
            {{/passengers}}
        </air:SeatMapReq>
    </soap:Body>
</soap:Envelope>
`;
