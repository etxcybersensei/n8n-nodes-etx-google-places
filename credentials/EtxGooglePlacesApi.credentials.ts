import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class EtxGooglePlacesApi implements ICredentialType {
	name = 'etxGooglePlacesApi';
	displayName = 'ETX Google Places API';
	icon = 'file:etxGooglePlaces.svg' as const;
	documentationUrl = 'https://github.com/ethicxl/n8n-nodes-etx-google-places';
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			required: true,
			default: '',
		},
	];
	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'X-Goog-Api-Key': '={{$credentials.apiKey}}',
			},
		},
	};
	test: ICredentialTestRequest = {
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
