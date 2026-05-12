export const USER_ROLE_VALUES = ["MEMBER", "STAFF"] as const;

export const USER_ROLE_LABELS_MAP = {
    MEMBER: "Member",
    STAFF: "Staff"
} as const;

export const USER_ROLE_OPTIONS = USER_ROLE_VALUES.map((value) => ({
    value,
    label: USER_ROLE_LABELS_MAP[value]
}));