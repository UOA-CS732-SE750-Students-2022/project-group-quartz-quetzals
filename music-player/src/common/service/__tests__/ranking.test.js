import {getRankingList} from "../ranking";

/**
 * Tests checking if the application is collecting getting correct information.
 */

it('successfully get new! ranking list', async () => {
    const result = await getRankingList(2809577409);
    expectResult(result);
    expect(result.playlist.tracks.length!==0).toBe(true);
});

it('successfully get UK ranking list', async () => {
    const result = await getRankingList(180106);
    expectResult(result);
    expect(result.playlist.tracks.length!==0).toBe(true);
});

it('successfully get Billboard ranking list', async () => {
    const result = await getRankingList(60198);
    expectResult(result);
    expect(result.playlist.tracks.length!==0).toBe(true);
});

it('successfully get Beatport ranking list', async () => {
    const result = await getRankingList(3812895);
    expectResult(result);
    expect(result.playlist.tracks.length!==0).toBe(true);
});


function expectResult(result) {
    expect(typeof result).toBe("object");
    expect(result.code).toBe(200);
}
