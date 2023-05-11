package com.kpi.gestoslide.domain.model;

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

    @OneToMany(mappedBy = "gesture")
    private List<MediaFile> images;
}
