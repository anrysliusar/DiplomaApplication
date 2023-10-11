package com.kpi.gestoslide.core.controller.settings;

import com.kpi.gestoslide.core.domain.model.ActionName;
import com.kpi.gestoslide.core.domain.model.GestureName;
import com.kpi.gestoslide.core.dto.IdentityDTO;
import com.kpi.gestoslide.core.dto.IdentityDescDTO;
import com.kpi.gestoslide.core.service.settings.SettingsManager;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/settings")
@AllArgsConstructor
public class SettingsController {

    private final SettingsManager settingsService;

    @GetMapping("/gesture-types")
    public List<IdentityDTO> getGestureTypes() {
        return settingsService.getGestureTypes();
    }

    @GetMapping("/actions")
    public List<IdentityDescDTO> getActions() {
        return settingsService.getActions();
    }

    @GetMapping("/gesture-actions")
    public Map<GestureName, ActionName> getGestureActions() {
        return settingsService.getGestureActions();
    }

    @PostMapping("/gesture-actions")
    public void saveGestureActions(Map<Long, Long> gestureActions) {
        settingsService.saveGestureActions(gestureActions);
    }
}
