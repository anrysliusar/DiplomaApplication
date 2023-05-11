package com.kpi.gestoslide.domain.model;

import jakarta.persistence.*;

@Entity
@Table(name = "MEDIA_FILE")
public class MediaFile {
    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "NAME")
    private String name;

    @Column(name = "FILE_PATH")
    private String filePath;

    @ManyToOne
    @JoinColumn(name = "SLIDE_ID")
    private Slide slide;

    @ManyToOne
    @JoinColumn(name = "GESTURE_ID")
    private Gesture gesture;
}
