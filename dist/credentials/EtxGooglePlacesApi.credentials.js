"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EtxGooglePlacesApi = void 0;
class EtxGooglePlacesApi {
    constructor() {
        this.name = 'etxGooglePlacesApi';
        this.displayName = 'ETX Google Places API';
        this.icon = 'file:etxGooglePlaces.svg';
        this.documentationUrl = 'https://github.com/ethicxl/n8n-nodes-etx-google-places';
        this.properties = [
            {
                displayName: 'API Key',
                name: 'apiKey',
                type: 'string',
                typeOptions: { password: true },
                required: true,
                default: '',
            },
        ];
        this.authenticate = {
            type: 'generic',
            properties: {
                headers: {
                    'X-Goog-Api-Key': '={{$credentials.apiKey}}',
                },
            },
        };
        this.test = {
            request: {
                baseURL: 'https://places.googleapis.com/v1',
                url: '/places:searchText',
                method: 'POST',
                headers: {
                    'X-Goog-FieldMask': 'places.displayName',
                    'Content-Type': 'application/json',
                },
                body: { textQuery: 'test' },
            },
        };
    }
}
exports.EtxGooglePlacesApi = EtxGooglePlacesApi;
//# sourceMappingURL=EtxGooglePlacesApi.credentials.js.map