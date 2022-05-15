import {getArtistFansNumber, getArtistList, getArtistSimilar} from "../artist"


it('successfully get artist similar', async () => {
  const result = await getArtistSimilar(1045123);
  expectResult(result);
});

it('successfully get artist FansNumber', async () => {
  const result = await getArtistFansNumber(1045123);
  expectResult(result);
});

it('successfully get artist list', async () => {
  const result = await getArtistList(1045123);
  expectResult(result);
});

function expectResult(result) {
  expect(typeof result).toBe("object");
}
