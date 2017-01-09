namespace SearchTiles.Models.AlienPeriodicTable
{
    public interface IElementModel
    {
        int Identity { get; }
        string Name { get; }
        string Abbreviation { get; }
        int Hue { get; }
    }
}
