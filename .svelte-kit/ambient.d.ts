// this file is generated — do not edit it

/// <reference types="@sveltejs/kit" />

/**
 * Environment variables [loaded by Vite](https://vitejs.dev/guide/env-and-mode.html#env-files) from `.env` files and `process.env`. Like [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private), this module cannot be imported into client-side code. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://svelte.dev/docs/kit/configuration#env) (if configured).
 *
 * _Unlike_ [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private), the values exported from this module are statically injected into your bundle at build time, enabling optimisations like dead code elimination.
 *
 * ```ts
 * import { API_KEY } from '$env/static/private';
 * ```
 *
 * Note that all environment variables referenced in your code should be declared (for example in an `.env` file), even if they don't have a value until the app is deployed:
 *
 * ```
 * MY_FEATURE_FLAG=""
 * ```
 *
 * You can override `.env` values from the command line like so:
 *
 * ```sh
 * MY_FEATURE_FLAG="enabled" npm run dev
 * ```
 */
declare module "$env/static/private" {
  export const SHELL: string;
  export const npm_command: string;
  export const COREPACK_ENABLE_AUTO_PIN: string;
  export const COLORTERM: string;
  export const hardeningDisable: string;
  export const XDG_MENU_PREFIX: string;
  export const TERM_PROGRAM_VERSION: string;
  export const configureFlags: string;
  export const QT_IM_MODULES: string;
  export const PC_CONFIG_FILES: string;
  export const mesonFlags: string;
  export const npm_config_npm_globalconfig: string;
  export const DIRENV_ACTIVE: string;
  export const DEVENV_TASK_FILE: string;
  export const PREK_HOME: string;
  export const NODE: string;
  export const DEVENV_CMDLINE: string;
  export const DEVENV_DIRENVRC_VERSION: string;
  export const SSH_AUTH_SOCK: string;
  export const DIRENV_DIR: string;
  export const npm_config_verify_deps_before_run: string;
  export const STRINGS: string;
  export const npm_config__jsr_registry: string;
  export const MEMORY_PRESSURE_WRITE: string;
  export const XMODIFIERS: string;
  export const DESKTOP_SESSION: string;
  export const LC_MONETARY: string;
  export const __ETC_PROFILE_NIX_SOURCED: string;
  export const npm_config_globalconfig: string;
  export const DIRENV_FILE: string;
  export const PWD: string;
  export const NIX_PROFILES: string;
  export const SOURCE_DATE_EPOCH: string;
  export const XDG_SESSION_DESKTOP: string;
  export const LOGNAME: string;
  export const XDG_SESSION_TYPE: string;
  export const NIX_ENFORCE_NO_NATIVE: string;
  export const PNPM_HOME: string;
  export const SYSTEMD_EXEC_PID: string;
  export const CXX: string;
  export const XAUTHORITY: string;
  export const system: string;
  export const NoDefaultCurrentDirectoryInExePath: string;
  export const PC_SOCKET_PATH: string;
  export const DEVENV_DOTFILE: string;
  export const CLAUDECODE: string;
  export const MOTD_SHOWN: string;
  export const GDM_LANG: string;
  export const DEVENV_DIRENVRC_ROLLING_UPGRADE: string;
  export const IN_NIX_SHELL: string;
  export const HOME: string;
  export const USERNAME: string;
  export const NIX_BINTOOLS: string;
  export const LANG: string;
  export const XDG_CURRENT_DESKTOP: string;
  export const npm_package_version: string;
  export const MEMORY_PRESSURE_WATCH: string;
  export const VTE_VERSION: string;
  export const WAYLAND_DISPLAY: string;
  export const cmakeFlags: string;
  export const NIX_SSL_CERT_FILE: string;
  export const NIX_STORE: string;
  export const DEVENV_ROOT: string;
  export const LD: string;
  export const INVOCATION_ID: string;
  export const pnpm_config_verify_deps_before_run: string;
  export const MANAGERPID: string;
  export const DIRENV_DIFF: string;
  export const INIT_CWD: string;
  export const READELF: string;
  export const npm_lifecycle_script: string;
  export const GNOME_SETUP_DISPLAY: string;
  export const XDG_SESSION_CLASS: string;
  export const TERM: string;
  export const npm_package_name: string;
  export const DISABLE_INSTALLATION_CHECKS: string;
  export const SIZE: string;
  export const USER: string;
  export const npm_config_frozen_lockfile: string;
  export const AR: string;
  export const AS: string;
  export const DISPLAY: string;
  export const NIX_BINTOOLS_WRAPPER_TARGET_HOST_x86_64_unknown_linux_gnu: string;
  export const DEVENV_TASKS: string;
  export const npm_lifecycle_event: string;
  export const SHLVL: string;
  export const DEVENV_RUNTIME: string;
  export const NM: string;
  export const GIT_EDITOR: string;
  export const NIX_CFLAGS_COMPILE: string;
  export const QT_IM_MODULE: string;
  export const LC_MEASUREMENT: string;
  export const LOCALE_ARCHIVE: string;
  export const MANAGERPIDFDID: string;
  export const npm_config_user_agent: string;
  export const OTEL_EXPORTER_OTLP_METRICS_TEMPORALITY_PREFERENCE: string;
  export const PNPM_SCRIPT_SRC_DIR: string;
  export const npm_execpath: string;
  export const DISABLE_AUTOUPDATER: string;
  export const XDG_RUNTIME_DIR: string;
  export const DEVENV_PROFILE: string;
  export const DIRENV_WARN_TIMEOUT: string;
  export const NIX_PKG_CONFIG_WRAPPER_TARGET_HOST_x86_64_unknown_linux_gnu: string;
  export const NODE_PATH: string;
  export const CLAUDE_CODE_ENTRYPOINT: string;
  export const OBJCOPY: string;
  export const DEBUGINFOD_URLS: string;
  export const LC_TIME: string;
  export const npm_package_json: string;
  export const STRIP: string;
  export const JOURNAL_STREAM: string;
  export const XDG_DATA_DIRS: string;
  export const OBJDUMP: string;
  export const PATH: string;
  export const GREET: string;
  export const npm_config_node_gyp: string;
  export const GDMSESSION: string;
  export const CC: string;
  export const NIX_CC: string;
  export const DBUS_SESSION_BUS_ADDRESS: string;
  export const DIRENV_WATCHES: string;
  export const NIX_CC_WRAPPER_TARGET_HOST_x86_64_unknown_linux_gnu: string;
  export const DEVENV_STATE: string;
  export const MAIL: string;
  export const npm_config_registry: string;
  export const CONFIG_SHELL: string;
  export const npm_node_execpath: string;
  export const RANLIB: string;
  export const NIX_HARDENING_ENABLE: string;
  export const LC_NUMERIC: string;
  export const OLDPWD: string;
  export const NIX_LDFLAGS: string;
  export const name: string;
  export const TERM_PROGRAM: string;
  export const PKG_CONFIG: string;
  export const NODE_ENV: string;
}

/**
 * Similar to [`$env/static/private`](https://svelte.dev/docs/kit/$env-static-private), except that it only includes environment variables that begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.
 *
 * Values are replaced statically at build time.
 *
 * ```ts
 * import { PUBLIC_BASE_URL } from '$env/static/public';
 * ```
 */
declare module "$env/static/public" {}

/**
 * This module provides access to runtime environment variables, as defined by the platform you're running on. For example if you're using [`adapter-node`](https://github.com/sveltejs/kit/tree/main/packages/adapter-node) (or running [`vite preview`](https://svelte.dev/docs/kit/cli)), this is equivalent to `process.env`. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://svelte.dev/docs/kit/configuration#env) (if configured).
 *
 * This module cannot be imported into client-side code.
 *
 * ```ts
 * import { env } from '$env/dynamic/private';
 * console.log(env.DEPLOYMENT_SPECIFIC_VARIABLE);
 * ```
 *
 * > [!NOTE] In `dev`, `$env/dynamic` always includes environment variables from `.env`. In `prod`, this behavior will depend on your adapter.
 */
declare module "$env/dynamic/private" {
  export const env: {
    SHELL: string;
    npm_command: string;
    COREPACK_ENABLE_AUTO_PIN: string;
    COLORTERM: string;
    hardeningDisable: string;
    XDG_MENU_PREFIX: string;
    TERM_PROGRAM_VERSION: string;
    configureFlags: string;
    QT_IM_MODULES: string;
    PC_CONFIG_FILES: string;
    mesonFlags: string;
    npm_config_npm_globalconfig: string;
    DIRENV_ACTIVE: string;
    DEVENV_TASK_FILE: string;
    PREK_HOME: string;
    NODE: string;
    DEVENV_CMDLINE: string;
    DEVENV_DIRENVRC_VERSION: string;
    SSH_AUTH_SOCK: string;
    DIRENV_DIR: string;
    npm_config_verify_deps_before_run: string;
    STRINGS: string;
    npm_config__jsr_registry: string;
    MEMORY_PRESSURE_WRITE: string;
    XMODIFIERS: string;
    DESKTOP_SESSION: string;
    LC_MONETARY: string;
    __ETC_PROFILE_NIX_SOURCED: string;
    npm_config_globalconfig: string;
    DIRENV_FILE: string;
    PWD: string;
    NIX_PROFILES: string;
    SOURCE_DATE_EPOCH: string;
    XDG_SESSION_DESKTOP: string;
    LOGNAME: string;
    XDG_SESSION_TYPE: string;
    NIX_ENFORCE_NO_NATIVE: string;
    PNPM_HOME: string;
    SYSTEMD_EXEC_PID: string;
    CXX: string;
    XAUTHORITY: string;
    system: string;
    NoDefaultCurrentDirectoryInExePath: string;
    PC_SOCKET_PATH: string;
    DEVENV_DOTFILE: string;
    CLAUDECODE: string;
    MOTD_SHOWN: string;
    GDM_LANG: string;
    DEVENV_DIRENVRC_ROLLING_UPGRADE: string;
    IN_NIX_SHELL: string;
    HOME: string;
    USERNAME: string;
    NIX_BINTOOLS: string;
    LANG: string;
    XDG_CURRENT_DESKTOP: string;
    npm_package_version: string;
    MEMORY_PRESSURE_WATCH: string;
    VTE_VERSION: string;
    WAYLAND_DISPLAY: string;
    cmakeFlags: string;
    NIX_SSL_CERT_FILE: string;
    NIX_STORE: string;
    DEVENV_ROOT: string;
    LD: string;
    INVOCATION_ID: string;
    pnpm_config_verify_deps_before_run: string;
    MANAGERPID: string;
    DIRENV_DIFF: string;
    INIT_CWD: string;
    READELF: string;
    npm_lifecycle_script: string;
    GNOME_SETUP_DISPLAY: string;
    XDG_SESSION_CLASS: string;
    TERM: string;
    npm_package_name: string;
    DISABLE_INSTALLATION_CHECKS: string;
    SIZE: string;
    USER: string;
    npm_config_frozen_lockfile: string;
    AR: string;
    AS: string;
    DISPLAY: string;
    NIX_BINTOOLS_WRAPPER_TARGET_HOST_x86_64_unknown_linux_gnu: string;
    DEVENV_TASKS: string;
    npm_lifecycle_event: string;
    SHLVL: string;
    DEVENV_RUNTIME: string;
    NM: string;
    GIT_EDITOR: string;
    NIX_CFLAGS_COMPILE: string;
    QT_IM_MODULE: string;
    LC_MEASUREMENT: string;
    LOCALE_ARCHIVE: string;
    MANAGERPIDFDID: string;
    npm_config_user_agent: string;
    OTEL_EXPORTER_OTLP_METRICS_TEMPORALITY_PREFERENCE: string;
    PNPM_SCRIPT_SRC_DIR: string;
    npm_execpath: string;
    DISABLE_AUTOUPDATER: string;
    XDG_RUNTIME_DIR: string;
    DEVENV_PROFILE: string;
    DIRENV_WARN_TIMEOUT: string;
    NIX_PKG_CONFIG_WRAPPER_TARGET_HOST_x86_64_unknown_linux_gnu: string;
    NODE_PATH: string;
    CLAUDE_CODE_ENTRYPOINT: string;
    OBJCOPY: string;
    DEBUGINFOD_URLS: string;
    LC_TIME: string;
    npm_package_json: string;
    STRIP: string;
    JOURNAL_STREAM: string;
    XDG_DATA_DIRS: string;
    OBJDUMP: string;
    PATH: string;
    GREET: string;
    npm_config_node_gyp: string;
    GDMSESSION: string;
    CC: string;
    NIX_CC: string;
    DBUS_SESSION_BUS_ADDRESS: string;
    DIRENV_WATCHES: string;
    NIX_CC_WRAPPER_TARGET_HOST_x86_64_unknown_linux_gnu: string;
    DEVENV_STATE: string;
    MAIL: string;
    npm_config_registry: string;
    CONFIG_SHELL: string;
    npm_node_execpath: string;
    RANLIB: string;
    NIX_HARDENING_ENABLE: string;
    LC_NUMERIC: string;
    OLDPWD: string;
    NIX_LDFLAGS: string;
    name: string;
    TERM_PROGRAM: string;
    PKG_CONFIG: string;
    NODE_ENV: string;
    [key: `PUBLIC_${string}`]: undefined;
    [key: `${string}`]: string | undefined;
  };
}

/**
 * Similar to [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private), but only includes variables that begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.
 *
 * Note that public dynamic environment variables must all be sent from the server to the client, causing larger network requests — when possible, use `$env/static/public` instead.
 *
 * ```ts
 * import { env } from '$env/dynamic/public';
 * console.log(env.PUBLIC_DEPLOYMENT_SPECIFIC_VARIABLE);
 * ```
 */
declare module "$env/dynamic/public" {
  export const env: {
    [key: `PUBLIC_${string}`]: string | undefined;
  };
}
