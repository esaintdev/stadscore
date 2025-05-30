
import SportCategories from '@/components/widgets/SportCatergories'
import SportsWidget from '../components/widgets/SportsWidget'

export const Basketball = () => {
  return (
    <div>
      <SportCategories selectedSport="basketball" onSelectSport={() => {}} />
      <SportsWidget sport="basketball" type="livescore" />
    </div>
  )
}
