# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.0] - 2026-03-31

### Added

- LinkedIn OIDC authentication flow through Supabase
- OAuth callback route for secure code exchange
- Supabase browser client setup
- Repository community files: README, LICENSE, SECURITY, CONTRIBUTING, Code of Conduct
- Issue templates and Pull Request template
- Root-level quality tooling: Husky, lint-staged, Prettier
- Minimal unit test setup with Vitest and Testing Library
- Product documentation: roadmap, auth flow diagram, local run guide

### Changed

- Homepage auth panel switched from local profile storage to real LinkedIn/Supabase session
- Project now includes strict pre-commit checks on staged files

## [0.1.0] - 2026-03-31

### Added

- Initial BlueDistrict 3D prototype (Next.js + Three.js)
- Fullscreen city scene with visual effects (roads, lights, fog, bloom)
- Explore mode and initial overlay UX
- BlueDistrict branding assets (logo)
