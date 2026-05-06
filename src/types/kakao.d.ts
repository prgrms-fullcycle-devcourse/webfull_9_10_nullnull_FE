interface Window {
  kakao: {
    maps: {
      load: (callback: () => void) => void;
      services: {
        Places: new () => {
          keywordSearch: (
            query: string,
            callback: (result: unknown[], status: string) => void,
          ) => void;
        };
        Geocoder: new () => {
          addressSearch: (
            address: string,
            callback: (result: unknown[], status: string) => void,
          ) => void;
        };
        Status: { OK: string };
      };
    };
  };
}
