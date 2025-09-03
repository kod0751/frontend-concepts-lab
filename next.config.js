/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // React Compiler 비활성화 (Recoil 호환성을 위해)
    reactCompiler: false,
  },
  // 또는 webpack 설정 추가
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    return config;
  },
};

module.exports = nextConfig;
