import {
	type IExecuteFunctions,
	type INodeExecutionData,
	type INodeType,
	type INodeTypeDescription,
	type IDataObject,
	NodeConnectionTypes,
} from 'n8n-workflow';

export class EtxGooglePlaces implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'ETX Google Places',
		name: 'etxGooglePlaces',
		icon: { light: 'file:etxGooglePlaces.svg', dark: 'file:etxGooglePlaces.dark.svg' },
		group: ['transform'],
		version: 1,
		description: 'Search places using Google Places API (New) — Text Search endpoint',
		defaults: { name: 'ETX Google Places' },
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
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

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const textQuery = this.getNodeParameter('textQuery', 0) as string;
		const fieldMask = this.getNodeParameter('fieldMask', 0) as string;

		const response = await this.helpers.httpRequestWithAuthentication.call(
			this,
			'etxGooglePlacesApi',
			{
				method: 'POST',
				url: 'https://places.googleapis.com/v1/places:searchText',
				headers: {
					'X-Goog-FieldMask': fieldMask,
					'Content-Type': 'application/json',
				},
				body: { textQuery },
				json: true,
			},
		);

		const places = (response.places || []) as IDataObject[];
		return [places.map((place) => ({ json: place }))];
	}
}
