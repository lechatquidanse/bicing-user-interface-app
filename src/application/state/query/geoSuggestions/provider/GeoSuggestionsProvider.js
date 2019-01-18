import GeoSuggestionsProviderError
  from 'application/state/query/geoSuggestions/provider/error/GeoSuggestionsProviderError';
import { stationsType } from 'domain/types/stationType';
import { HttpStationsQuery } from 'infrastructure/bicingApi';

class GeoSuggestionsProvider {
  static async provide() {
    if (GeoSuggestionsProvider.hasApiKey() === true) {
      return [];
    }

    const geoSuggestions = await HttpStationsQuery.find();

    return GeoSuggestionsProvider.validate(geoSuggestions);
  }

  static async validate(geoSuggestions) {
    return stationsType.validate(geoSuggestions)
      .then(geoSuggestions)
      .catch((validationError) => {
        throw GeoSuggestionsProviderError.withInvalidResponseSchema(
          validationError.details.map(d => d.message).toString(),
        );
      });
  }

  static hasApiKey() {
    return process.env.GEO_SUGGESTION_API_KEY !== undefined;
  }
}

export default GeoSuggestionsProvider;
