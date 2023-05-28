package com.kpi.gestoslide.core.dto.tree;


import java.util.List;

public record TreeNode<T>(
        String label,
        boolean leaf,
        boolean expanded,
        T data,
        List<TreeNode<T>> children
) {
}
