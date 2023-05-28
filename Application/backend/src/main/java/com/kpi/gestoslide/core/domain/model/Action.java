package com.kpi.gestoslide.core.domain.model;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "ACTION")
public class Action {
    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "NAME")
    private String name;

    @Column(name = "DESCRIPTION")
    private String description;

    @OneToMany(mappedBy = "action")
    private List<GestureAction> gestureAction;
}

