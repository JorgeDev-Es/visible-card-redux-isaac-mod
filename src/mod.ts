import { initModFeatures, ISCFeature, ModCallbackCustom, upgradeMod } from "isaacscript-common";
import { CardType, EntityType, ModCallback, PickupVariant } from "isaac-typescript-definitions";
import { ModCallbackRepentogon } from "isaac-typescript-definitions-repentogon";

const name = "Visible Cards Redux (Repentogon)";

export function main(): void {
  const modVanilla = RegisterMod(name, 1);
  const mod = upgradeMod(modVanilla, [ISCFeature.SAVE_DATA_MANAGER] as const);
  const ModFeatures = [] as const;

  mod.AddCallbackCustom(ModCallbackCustom.POST_PICKUP_UPDATE_FILTER, onPostPeffectUpdateOrdered, PickupVariant.CARD);
  mod.AddCallback(ModCallback.POST_PICKUP_INIT, onPostPickupInit, PickupVariant.CARD);

  mod.saveDataManager("Cards", data);

  initModFeatures(mod, ModFeatures);
}
//
// function test(card: EntityPickup)
// {
//   let animationName = ""
//   const sprite = card.GetSprite()
//   const animation = sprite.GetAnimation()
//   const name = sprite.GetFilename()
//   if (animation !== animationName) {
//     animationName = animation;
//     Isaac.DebugString(animation)
//     Isaac.DebugString(name)
//   }
//
//   return undefined
// }

const data = {
  level: {
    collectedCards: new Set<number>(),
  },
};

const shouldReplaceCard = new Set([
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
  22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 42, 44, 46, 48, 52, 53, 54, 56, 57,
  58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76,
  79,
]);
let pendingReplacementCards: EntityPickup[] = [];

function onPostPeffectUpdateOrdered(): void {
  for (const card of pendingReplacementCards) {
    const isVisible = data.level.collectedCards.has(card.InitSeed);

    if (isVisible) {
      const sprite = card.GetSprite();
      const spritesheet = `gfx/ui/Card_${card.SubType.toString().padStart(2, "0")}.png`;

      sprite.ReplaceSpritesheet(0, spritesheet);
      sprite.ReplaceSpritesheet(1, spritesheet);
      sprite.LoadGraphics();
      Isaac.DebugString("updating graphics")
    }
  }
  pendingReplacementCards = [];
}

function onPostPickupInit(pickup: EntityPickup): void {
  if (
    pickup.Variant === PickupVariant.CARD &&
    CardType[pickup.SubType] !== null &&
    shouldReplaceCard.has(pickup.SubType)
  ) {
    const spawnerEntity = pickup.SpawnerEntity;
    pendingReplacementCards.push(pickup);

    if (spawnerEntity && spawnerEntity.Type === EntityType.PLAYER) {
      data.level.collectedCards.add(pickup.InitSeed);
    }
  }
}

function getOrSetSprite() {
  
}