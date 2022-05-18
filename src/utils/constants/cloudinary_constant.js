export const cloudinary_constant = (upload_preset, cropping, multiple) => {
  return {
    cloudName: "mnuxd",
    uploadPreset: upload_preset,
    sources: ["local", "camera"],
    googleApiKey: "<image_search_google_api_key>", //ddd
    showAdvancedOptions: false,
    cropping: cropping, //ddd
    multiple: multiple, //ddd
    defaultSource: "local",
    styles: {
      palette: {
        window: "#FFFFFF",
        sourceBg: "#FFFFFF",
        windowBorder: "#FFAA00",
        tabIcon: "#FFFFFF",
        inactiveTabIcon: "#FFDB92",
        menuIcons: "#0094C7",
        link: "#FFAA00",
        action: "#FF2929",
        inProgress: "#000000",
        complete: "#FFAA00",
        error: "#c43737",
        textDark: "#000000",
        textLight: "#FFFFFF",
      },
      fonts: {
        default: null,
        "'Poppins', sans-serif": {
          url: "https://fonts.googleapis.com/css?family=Poppins",
          active: true,
        },
      },
    },
  };
};
