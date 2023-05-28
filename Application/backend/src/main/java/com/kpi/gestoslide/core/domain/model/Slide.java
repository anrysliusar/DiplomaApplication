package com.kpi.gestoslide.core.domain.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
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
    private List<MediaFile> mediaFiles = new ArrayList<>();
}
