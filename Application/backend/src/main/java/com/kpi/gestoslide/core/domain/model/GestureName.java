package com.kpi.gestoslide.core.domain.model;

public enum GestureName {
    NONE("None"),
    OPEN_PALM("Open_Palm"),
    POINTING_UP("Pointing_Up"),
    THUMB_UP("Thumb_Up"),
    THUMB_DOWN("Thumb_Down"),
    VICTORY("Victory"),
    CLOSED_FIST("Closed_Fist");

    private final String name;

    GestureName(String name) {
        this.name = name;
    }

    public String Name() {
        return name;
    }
}
