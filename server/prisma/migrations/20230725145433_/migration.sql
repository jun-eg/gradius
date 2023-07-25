-- CreateTable
CREATE TABLE "Player" (
    "id" TEXT NOT NULL,
    "player_name" TEXT NOT NULL,
    "pos_x" INTEGER NOT NULL,
    "pos_y" INTEGER NOT NULL,
    "speed" INTEGER NOT NULL,
    "hp" INTEGER NOT NULL,
    "score" INTEGER NOT NULL,
    "size_width" INTEGER NOT NULL,
    "size_height" INTEGER NOT NULL,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);
