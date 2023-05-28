package com.kpi.gestoslide.core.domain.model;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "GESTURE")
public class Gesture {
    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "NAME")
    private String name;

    @ElementCollection
    @CollectionTable(name = "GESTURE_IMAGES",
            joinColumns = @JoinColumn(name = "GESTURE_ID"))
    private List<String> imageName;
}