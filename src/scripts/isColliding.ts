// Types
type React = {
    x: number;
    y: number;
    width: number;
    height: number;
}

export const isColliding = (a: React, b: React) => {
    "worklet";
    return (
        a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y
    )
}