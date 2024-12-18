import withMT from "@material-tailwind/react/utils/withMT";
import flowbitePlugin from "flowbite/plugin";

export default withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "white-fill": "url('/src/assets/white-fill-04.png')",
        "blue-fill": "url('/src/assets/blue-fill-new.png')",
        // "white-fill": "url('/src/assets/white-fill.png')",
        //"blue-fill": "url('/src/assets/blue-fill.png')",
      },
    },
  },
  plugins: [flowbitePlugin],
});
