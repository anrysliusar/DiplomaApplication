package com.kpi.gestoslide.domain.model;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "SLIDE")
public class Slide {
    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "NAME")
    private String name;

    @Column(name = "CONTENT")
    private String content;

    @Column(name = "SEQUENCE_NUMBER")
    private Integer sequenceNumber;

    @ManyToOne
    @JoinColumn(name = "PRESENTATION_ID")
    private Presentation presentation;

    @OneToMany(mappedBy = "slide")
    private List<MediaFile> mediaFiles;
}
