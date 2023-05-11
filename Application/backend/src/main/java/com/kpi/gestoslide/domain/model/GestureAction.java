package com.kpi.gestoslide.domain.model;

import jakarta.persistence.*;

@Entity
@Table(name = "GESTURE_ACTION")
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
    private User user;
}
