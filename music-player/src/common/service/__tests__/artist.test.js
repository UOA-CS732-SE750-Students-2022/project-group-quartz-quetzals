import {getArtistList} from "../artist";

/**
 * Tests checking if the application is collecting getting correct information.
 */

it('successfully get popular male artists', async () => {
    const result = await getArtistList(1,6);
    expectResult(result);
    expect(result.artists.length).toBe(6);
});
it('successfully get popular female artists', async () => {
    const result = await getArtistList(2,5);
    expectResult(result);
    expect(result.artists.length).toBe(5);
});

it('successfully get popular band artists', async () => {
    const result = await getArtistList(3,5);
    expectResult(result);
    expect(result.artists.length).toBe(5);
});

function expectResult(result) {
    expect(typeof result).toBe("object");
    expect(result.code).toBe(200);
}
