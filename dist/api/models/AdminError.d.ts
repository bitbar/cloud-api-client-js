export declare enum AdminErrorType {
    ABORT_REQUEST = "ABORT_REQUEST",
    ADB_COMMAND_REJECTED = "ADB_COMMAND_REJECTED",
    ADB_SHELL_COMMAND_FAILED = "ADB_SHELL_COMMAND_FAILED",
    APP_LOCK_NOT_INSTALLED = "APP_LOCK_NOT_INSTALLED",
    DEVICE_OFFLINE = "DEVICE_OFFLINE",
    DEVICE_OUTPUT_NULL = "DEVICE_OUTPUT_NULL",
    GAMEBENCH_ERROR = "GAMEBENCH_ERROR",
    GAMEBENCH_NOT_SUPPORTED = "GAMEBENCH_NOT_SUPPORTED",
    GRANT_FAILED = "GRANT_FAILED",
    INSTALL_FAILED = "INSTALL_FAILED",
    INTERACTIVE_SETUP_FAILED = "INTERACTIVE_SETUP_FAILED",
    INTERNAL_INSTALL_FAILED = "INTERNAL_INSTALL_FAILED",
    INVALID_TEST_SESSION_FILE = "INVALID_TEST_SESSION_FILE",
    LOCK_EXPIRED = "LOCK_EXPIRED",
    LOCK_TIMEOUT = "LOCK_TIMEOUT",
    NO_NETWORK_CONNECTION = "NO_NETWORK_CONNECTION",
    OTHER = "OTHER",
    REBOOTING_TIMEOUT = "REBOOTING_TIMEOUT",
    REPACKAGING = "REPACKAGING",
    RESULTS_PREPARING = "RESULTS_PREPARING",
    RESULTS_PROCESSING = "RESULTS_PROCESSING",
    RESULTS_SENDING = "RESULTS_SENDING",
    STEP_TIMEOUT = "STEP_TIMEOUT",
    SYSTEM_FAILURE = "SYSTEM_FAILURE",
    TEST_RUN_FAILED = "TEST_RUN_FAILED",
    TEST_RUN_INTERRUPTED = "TEST_RUN_INTERRUPTED",
    TEST_RUN_TIMEOUT = "TEST_RUN_TIMEOUT",
    TEST_RUN_WARNED = "TEST_RUN_WARNED",
    TEST_TIMEOUT = "TEST_TIMEOUT",
    VNC_CONNECTION_SETUP_FAILED = "VNC_CONNECTION_SETUP_FAILED",
    XCRUN_INSTRUMENTS_COMMAND_FAILED = "XCRUN_INSTRUMENTS_COMMAND_FAILED",
    XCRUN_INSTRUMENTS_JS_ERROR = "XCRUN_INSTRUMENTS_JS_ERROR"
}
export type AdminError = {
    id: number;
    quantity: number;
    type: AdminErrorType;
};
