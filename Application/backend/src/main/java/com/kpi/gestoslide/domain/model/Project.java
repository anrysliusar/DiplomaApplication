package com.kpi.gestoslide.domain.model;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "PROJECT")
public class Project {
    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "NAME", nullable = false)
    private String name;

    @Column(name = "DESCRIPTION", nullable = false)
    private String description;

    @ManyToMany(mappedBy = "projects")
    private List<AppUser> users;

    @OneToMany(mappedBy = "project")
    private List<Presentation> presentations;
}
