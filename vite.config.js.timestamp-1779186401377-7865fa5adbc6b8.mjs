// vite.config.js
import { sentryVitePlugin } from "file:///D:/My%20Projects/VS%20Code%20Projects/Website/Arhans-Portfolio(vite)/node_modules/@sentry/vite-plugin/dist/esm/index.mjs";
import { defineConfig } from "file:///D:/My%20Projects/VS%20Code%20Projects/Website/Arhans-Portfolio(vite)/node_modules/vite/dist/node/index.js";
import react from "file:///D:/My%20Projects/VS%20Code%20Projects/Website/Arhans-Portfolio(vite)/node_modules/@vitejs/plugin-react/dist/index.mjs";
var vite_config_default = defineConfig({
  plugins: [react(), sentryVitePlugin({
    org: "arhanansari",
    project: "arhans-portfolio"
  })],
  server: {
    proxy: {
      "/api/ai-twin": {
        target: process.env.VITE_API_URL || "http://localhost:3001",
        changeOrigin: true,
        secure: false,
        ws: true,
        rewrite: (path) => path.replace(/^\/api/, "")
      }
    }
  },
  build: {
    sourcemap: true
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxNeSBQcm9qZWN0c1xcXFxWUyBDb2RlIFByb2plY3RzXFxcXFdlYnNpdGVcXFxcQXJoYW5zLVBvcnRmb2xpbyh2aXRlKVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcTXkgUHJvamVjdHNcXFxcVlMgQ29kZSBQcm9qZWN0c1xcXFxXZWJzaXRlXFxcXEFyaGFucy1Qb3J0Zm9saW8odml0ZSlcXFxcdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L015JTIwUHJvamVjdHMvVlMlMjBDb2RlJTIwUHJvamVjdHMvV2Vic2l0ZS9BcmhhbnMtUG9ydGZvbGlvKHZpdGUpL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgc2VudHJ5Vml0ZVBsdWdpbiB9IGZyb20gXCJAc2VudHJ5L3ZpdGUtcGx1Z2luXCI7XHJcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXHJcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCdcclxuXHJcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgcGx1Z2luczogW3JlYWN0KCksIHNlbnRyeVZpdGVQbHVnaW4oe1xyXG4gICAgb3JnOiBcImFyaGFuYW5zYXJpXCIsXHJcbiAgICBwcm9qZWN0OiBcImFyaGFucy1wb3J0Zm9saW9cIlxyXG4gIH0pXSxcclxuXHJcbiAgc2VydmVyOiB7XHJcbiAgICBwcm94eToge1xyXG4gICAgICAnL2FwaS9haS10d2luJzoge1xyXG4gICAgICAgIHRhcmdldDogcHJvY2Vzcy5lbnYuVklURV9BUElfVVJMIHx8ICdodHRwOi8vbG9jYWxob3N0OjMwMDEnLFxyXG4gICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcclxuICAgICAgICBzZWN1cmU6IGZhbHNlLFxyXG4gICAgICAgIHdzOiB0cnVlLFxyXG4gICAgICAgIHJld3JpdGU6IChwYXRoKSA9PiBwYXRoLnJlcGxhY2UoL15cXC9hcGkvLCAnJyksXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBidWlsZDoge1xyXG4gICAgc291cmNlbWFwOiB0cnVlXHJcbiAgfVxyXG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUE0WCxTQUFTLHdCQUF3QjtBQUM3WixTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFdBQVc7QUFHbEIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUyxDQUFDLE1BQU0sR0FBRyxpQkFBaUI7QUFBQSxJQUNsQyxLQUFLO0FBQUEsSUFDTCxTQUFTO0FBQUEsRUFDWCxDQUFDLENBQUM7QUFBQSxFQUVGLFFBQVE7QUFBQSxJQUNOLE9BQU87QUFBQSxNQUNMLGdCQUFnQjtBQUFBLFFBQ2QsUUFBUSxRQUFRLElBQUksZ0JBQWdCO0FBQUEsUUFDcEMsY0FBYztBQUFBLFFBQ2QsUUFBUTtBQUFBLFFBQ1IsSUFBSTtBQUFBLFFBQ0osU0FBUyxDQUFDLFNBQVMsS0FBSyxRQUFRLFVBQVUsRUFBRTtBQUFBLE1BQzlDO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUVBLE9BQU87QUFBQSxJQUNMLFdBQVc7QUFBQSxFQUNiO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
