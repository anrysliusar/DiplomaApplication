package com.kpi.gestoslide.core.service.settings;

import com.kpi.gestoslide.core.domain.model.ActionName;
import com.kpi.gestoslide.core.domain.model.GestureName;
import com.kpi.gestoslide.core.dto.IdentityDTO;
import com.kpi.gestoslide.core.dto.IdentityDescDTO;

import java.util.List;
import java.util.Map;

public interface SettingsManager {
    List<IdentityDTO> getGestureTypes();
    List<IdentityDescDTO> getActions();
    Map<GestureName, ActionName> getGestureActions();
    void saveGestureActions(Map<Long, Long> gestureActions);
}
