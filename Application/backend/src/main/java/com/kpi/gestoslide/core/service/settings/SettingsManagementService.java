package com.kpi.gestoslide.core.service.settings;

import com.kpi.gestoslide.core.domain.model.ActionName;
import com.kpi.gestoslide.core.domain.model.GestureAction;
import com.kpi.gestoslide.core.domain.model.GestureName;
import com.kpi.gestoslide.core.domain.repository.ActionRepository;
import com.kpi.gestoslide.core.domain.repository.GestureActionRepository;
import com.kpi.gestoslide.core.domain.repository.GestureRepository;
import com.kpi.gestoslide.core.dto.IdentityDTO;
import com.kpi.gestoslide.core.dto.IdentityDescDTO;
import com.kpi.gestoslide.security.service.authentication.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class SettingsManagementService implements SettingsManager {
    private final GestureRepository gestureRepository;
    private final ActionRepository actionRepository;
    private final GestureActionRepository gestureActionRepository;
    private final AuthenticationService authenticationService;


    @Override
    public List<IdentityDTO> getGestureTypes() {
        return gestureRepository.findAll()
                .stream()
                .map(gesture -> new IdentityDTO(
                        gesture.getId(),
                        gesture.getName().Name()
                ))
                .toList();
    }

    @Override
    public List<IdentityDescDTO> getActions() {
        return actionRepository.findAll()
                .stream()
                .map(action -> new IdentityDescDTO(
                        action.getId(),
                        action.getName().name(),
                        action.getDescription()
                ))
                .toList();
    }

    @Override
    public Map<GestureName, ActionName> getGestureActions() {
        Long id = authenticationService.getAuthenticatedUser().getId();
        return gestureActionRepository.findAll()
                .stream()
                .filter(gestureAction -> Objects.equals(gestureAction.getUser().getId(), id))
                .collect(HashMap::new, (map, gestureAction) ->
                                map.put(gestureAction.getGesture().getName(), gestureAction.getAction().getName()),
                        HashMap::putAll);
    }

    @Override
    public void saveGestureActions(Map<Long, Long> gestureActions) {
        Long id = authenticationService.getAuthenticatedUser().getId();
        gestureActions.forEach((gestureId, actionId) -> {
            gestureActionRepository.deleteAllByUserId(id);
            gestureRepository.findById(gestureId).ifPresent(gesture ->
                    actionRepository.findById(actionId).ifPresent(action -> {
                        GestureAction gestureAction = new GestureAction();
                        gestureAction.setGesture(gesture);
                        gestureAction.setAction(action);
                        gestureActionRepository.save(gestureAction);
                    }));
        });
    }
}
