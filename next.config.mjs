/** @type {import('next').NextConfig} */
const nextConfig = {

  output: "export",
 /* webpack:(config,{isServer})=>{
    if(!isServer){
      config.output.filename="[name]-[contenthash].js";
      config.output.chunkFilename="[name]-[contenthash].js";

      /*config.optimization.splitChunks={
        chunks:'async',
        cacheGroups:{
          default:false,
          vendors:false,
          common:{
            name:"common",
            chunks:'all',
            minChunks:2,
            reuseExistingChunk:true,
            enforce:true,
          }
        }
      }
    }

    return config;
  },*/

    reactStrictMode: false,
   
};

export default nextConfig;
