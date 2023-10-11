package com.kpi.gestoslide.core.domain.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "GESTURE_ACTION")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class GestureAction {
    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "GESTURE_ID")
    private Gesture gesture;

    @ManyToOne
    @JoinColumn(name = "ACTION_ID")
    private Action action;

    @ManyToOne
    @JoinColumn(name = "USER_ID")
    private AppUser user;
}
