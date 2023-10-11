package com.kpi.gestoslide.core.domain.model;

public enum ActionName {
    NEXT_SLIDE("Move to next slide"),
    PREVIOUS_SLIDE("Move to previous slide"),
    LAST_SLIDE("Move to last slide"),
    ACTIVATE_POINTER("Activate pointer"),
    ACTIVATE_DRAW("Activate draw"),
    DEACTIVATE_ALL("Deactivate additional functions (pointer, draw)");

    private final String name;

    ActionName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return name;
    }

}
