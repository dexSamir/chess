import {
  type Piece,
  TeamType,
  PieceType,
  type Position,
} from "../constants/constants";

export default class Referee {
  tileIsOccupied(x: number, y: number, boardState: Piece[]): boolean {
    const piece = boardState.find(
      (p) => p.position.x === x && p.position.y === y
    );

    return piece ? true : false;
  }

  tileIsOccupiedByOpponennt(
    x: number,
    y: number,
    boardState: Piece[],
    team: TeamType
  ): boolean {
    const piece = boardState.find(
      (p) => p.position.x === x && p.position.y === y && p.team !== team
    );

    return piece ? true : false;
  }

  isEnPassantMove(
    initialPostion: Position,
    desiredPostion: Position,
    type: PieceType,
    team: TeamType,
    boardState: Piece[]
  ) {
    const pawnDirection = team === TeamType.OUR ? 1 : -1;

    if (type === PieceType.PAWN) {
      if (
        (desiredPostion.x - initialPostion.x === -1 ||
          desiredPostion.x - initialPostion.x === -1) &&
        desiredPostion.y - initialPostion.y === pawnDirection
      ) {
        const piece = boardState.find(
          (p) =>
            p.position.x === desiredPostion.x &&
            p.position.y === desiredPostion.y - pawnDirection &&
            p.enPassant
        );
        if (piece) return true;
      }
    }

    return false;
  }

  isValidMove(
    initialPostion: Position,
    desiredPostion: Position,
    type: PieceType,
    team: TeamType,
    boardState: Piece[]
  ) {
    if (type === PieceType.PAWN) {
      const specialRow = team === TeamType.OUR ? 1 : 6;
      const pawnDirection = team === TeamType.OUR ? 1 : -1;

      //MOVEMENT LOGIC
      if (
        desiredPostion.x === initialPostion.x &&
        initialPostion.y === specialRow &&
        desiredPostion.y - initialPostion.y === 2 * pawnDirection
      ) {
        if (
          !this.tileIsOccupied(
            desiredPostion.x,
            desiredPostion.y,
            boardState
          ) &&
          !this.tileIsOccupied(
            desiredPostion.x,
            desiredPostion.y - pawnDirection,
            boardState
          )
        ) {
          return true;
        }
      } else if (
        initialPostion.x === desiredPostion.x &&
        desiredPostion.y - initialPostion.y === pawnDirection
      ) {
        if (
          !this.tileIsOccupied(desiredPostion.x, desiredPostion.y, boardState)
        ) {
          return true;
        }
      }

      //ATTACK LOGIC
      else if (
        desiredPostion.x - initialPostion.x === -1 &&
        desiredPostion.y - initialPostion.y === pawnDirection
      ) {
        if (
          this.tileIsOccupiedByOpponennt(
            desiredPostion.x,
            desiredPostion.y,
            boardState,
            team
          )
        ) {
          return true;
        }
      } else if (
        desiredPostion.x - initialPostion.x === 1 &&
        desiredPostion.y - initialPostion.y === pawnDirection
      ) {
        if (
          this.tileIsOccupiedByOpponennt(
            desiredPostion.x,
            desiredPostion.y,
            boardState,
            team
          )
        ) {
          return true;
        }
      }
    }

    return false;
  }
}
