import Carousel from "react-bootstrap/Carousel";
import React from "react";
import CardDeck from "react-bootstrap/CardDeck";
import PromotionGroupCard from "./PromotionGroupCard";
import GroupService from "../../services/GroupService";
import CarouselItem from "react-bootstrap/CarouselItem";
import GroupDetailModal from "../GroupDetail/GroupDetailModal";
import Utils from "../../utils/Util";

class PromotionCarousel extends React.Component {
  constructor(props) {
    super();

    this.state = {
      promotedGroups: null,
      occSlots: null
    }
  }

  async componentDidMount(): void {
    const promotedGroups = await GroupService.search({}, 6);
    console.log("PROMOTED GROUPS:" + promotedGroups.length);
    let occSlots = [];
    for (const promotedGroup of promotedGroups) {
      try {
        const occSlot = await GroupService.countOccSlots(promotedGroup._id);
        occSlots.push(occSlot.occupied);
      } catch (e) {
        console.error(e)
      }
    }
    await this.setState({promotedGroups: promotedGroups, occSlots: occSlots});
  }

  renderCarouselItem(itemsPerSide) {
    if (this.state.promotedGroups) {
      let carouselItems = [];
      const sides = this.state.promotedGroups.length / itemsPerSide;
      let itemsLeft = this.state.promotedGroups.length;

      this.state.promotedGroups.length;
      for (let i = 0; i < sides; i++) {
        console.log("RENDER CAROUSEL: "+i);
        carouselItems.push(
            <CarouselItem>
              <div className={"inheritWidth"}>
                <CardDeck>
                  {this.renderCards((i * itemsPerSide), ((itemsLeft >= (i + 1) * itemsPerSide) ? ((i + 1) * itemsPerSide) : ((i * itemsPerSide) + itemsLeft)))}
                </CardDeck>
              </div>
            </CarouselItem>
        );
        itemsLeft = itemsLeft - itemsPerSide;
      }
      return carouselItems;
    }
  }

  renderCards(from, to) {
    if (this.state.promotedGroups) {
      let cardList = [];
      for (let i = from; i < to && i < this.state.promotedGroups.length; i++) {
        cardList.push(
              <PromotionGroupCard group={this.state.promotedGroups[i]} occSlots={this.state.occSlots[i]} pricePerPerson={Utils.calcPricePerPerson(this.state.promotedGroups[i])}/>
        )
      }
      return cardList;
    }

  }

  render() {
    return (
        <div>
          <h4>Promoted Groups:</h4>
          <Carousel controls={false} indicators={false} pause={'hover'}>
            {this.state.promotedGroups && this.renderCarouselItem(3)}
          </Carousel>
        </div>
    )
  }
}

export default PromotionCarousel;
