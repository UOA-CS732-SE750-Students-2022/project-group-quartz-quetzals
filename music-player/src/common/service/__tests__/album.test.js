import {getAlbumList, getSongInfo, getSongPlay, getSongUrl} from '../album';

/**
 * Tests checking if the application is collecting getting correct information.
 */

it('successfully get album list', async () => {
    const result = await getAlbumList();
    expectResult(result);
    expect(result.albums.length).toBe(5);
});

it('successfully get song info', async () => {
    const result = await getSongInfo(143938524);
    expectResult(result);
});

it('successfully get song play', async () => {
    const result = await getSongPlay(114514);
    expectResult(result);
});

it('successfully get song url', async () => {
    const result = await getSongUrl(114514);
    expectResult(result);
    expect(result.data[0].id).toBe(114514);
    expect(result.data.url === null).toBe(false)
});

function expectResult(result) {
    expect(typeof result).toBe("object");
    expect(result.code).toBe(200);
}