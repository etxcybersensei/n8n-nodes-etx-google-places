"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EtxGooglePlaces = void 0;
const n8n_workflow_1 = require("n8n-workflow");
class EtxGooglePlaces {
    constructor() {
        this.description = {
            displayName: 'ETX Google Places',
            name: 'etxGooglePlaces',
            icon: { light: 'file:etxGooglePlaces.svg', dark: 'file:etxGooglePlaces.dark.svg' },
            group: ['transform'],
            version: 1,
            description: 'Search places using Google Places API (New) — Text Search endpoint',
            defaults: { name: 'ETX Google Places' },
            usableAsTool: true,
            inputs: [n8n_workflow_1.NodeConnectionTypes.Main],
            outputs: [n8n_workflow_1.NodeConnectionTypes.Main],
            credentials: [
                {
                    name: 'etxGooglePlacesApi',
                    required: true,
                },
            ],
            properties: [
                {
                    displayName: 'Text Query',
                    name: 'textQuery',
                    type: 'string',
                    default: '',
                    required: true,
                    placeholder: 'e.g. coffee shops in London',
                    description: 'The search query to find places',
                },
                {
                    displayName: 'Field Mask',
                    name: 'fieldMask',
                    type: 'string',
                    default: 'places.displayName,places.formattedAddress,places.location,places.rating,places.googleMapsUri,places.nationalPhoneNumber',
                    description: 'Comma-separated list of fields to return from the API',
                },
            ],
        };
    }
    async execute() {
        const textQuery = this.getNodeParameter('textQuery', 0);
        const fieldMask = this.getNodeParameter('fieldMask', 0);
        const response = await this.helpers.httpRequestWithAuthentication.call(this, 'etxGooglePlacesApi', {
            method: 'POST',
            url: 'https://places.googleapis.com/v1/places:searchText',
            headers: {
                'X-Goog-FieldMask': fieldMask,
                'Content-Type': 'application/json',
            },
            body: { textQuery },
            json: true,
        });
        const places = (response.places || []);
        return [places.map((place) => ({ json: place }))];
    }
}
exports.EtxGooglePlaces = EtxGooglePlaces;
//# sourceMappingURL=EtxGooglePlaces.node.js.map