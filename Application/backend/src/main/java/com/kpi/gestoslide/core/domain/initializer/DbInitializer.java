package com.kpi.gestoslide.core.domain.initializer;

import com.kpi.gestoslide.core.domain.model.Action;
import com.kpi.gestoslide.core.domain.model.ActionName;
import com.kpi.gestoslide.core.domain.model.Gesture;
import com.kpi.gestoslide.core.domain.model.GestureName;
import com.kpi.gestoslide.core.domain.repository.ActionRepository;
import com.kpi.gestoslide.core.domain.repository.GestureRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
public class DbInitializer implements CommandLineRunner {

    private final GestureRepository gestureRepository;
    private final ActionRepository actionRepository;

    @Autowired
    public DbInitializer(GestureRepository gestureRepository, ActionRepository actionRepository) {
        this.gestureRepository = gestureRepository;
        this.actionRepository = actionRepository;
    }

    @Override
    public void run(String... args) {
        // Create a new gesture entities
        Arrays.stream(GestureName.values()).map(gestureName -> {
            Gesture gesture = new Gesture();
            gesture.setName(gestureName);
            return gesture;
        }).forEach(gestureRepository::save);

        // Create a new action entities
        Arrays.stream(ActionName.values()).map(actionName -> {
            Action action = new Action();
            action.setName(actionName);
            action.setDescription(actionName.getDescription());
            return action;
        }).forEach(actionRepository::save);
    }
}
