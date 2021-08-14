import React from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {FONTS, COLORS, SIZES} from '../../constants';

export default function index() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: SIZES.padding * 3,
      }}>
      <Text
        style={[
          FONTS.h3,
          {color: COLORS.primary, marginVertical: SIZES.padding},
        ]}>
        Disclosure
      </Text>
      <ScrollView>
        <Text style={styles.paragraph}>
          We do not receive any consideration by way of remuneration or
          compensation or in any other form whatsoever, by us or any of our
          associates or subsidiaries for any distribution or execution services
          in respect of the products or securities for which the investment
          advice is provided to the client.
        </Text>
        <Text style={styles.paragraph}>
          We do not recommend a STOCK BROKER. If any stock broker is recommended
          by any of our representative, we do not receive any consideration by
          way of remuneration or compensation or in any other form whatsoever
          from stock broker or any other intermediary so recommended to client.
          To ensure compliance with the Investment Advisor regulations 2013, we
          have resolved that the company and all its representatives will not
          make any trades in the market.
        </Text>
        <Text style={styles.paragraph}>
          We are not associated in any manner with any issuer of products/
          securities; this ensures that there are no actual or potential
          conflicts of interest. This also ensures that objectivity or
          independence in the carrying on of investment advisory services is not
          compromised.
        </Text>
        <Text style={styles.paragraph}>
          Investment is stock or COMMODITY MARKETS is subject to market risk,
          though best attempts are made for predicting markets, but no surety of
          return or accuracy of any kind is guaranteed, while the performance
          sheet of various products is available but should not be considered as
          a guarantee for future performance of the products/services. Clients
          are advised to consider all the advice as just a opinion and make
          investment decision on their own. In case of clients seeking advice on
          any specific positions already made by the client, we will be able to
          suggest best possible action considering our view on the security or
          product. Such suggestion under any circumstances shall be considered
          as an opinion (not advice) from our company and we advice client to
          consider our opinion and not consultancy to make his/her final
          decision. We are not liable for any losses whatsoever client may incur
          in accepting this opinion.
        </Text>
        <Text style={styles.paragraph}>
          Client is also advised to trade only if tips suit his current risk
          appetite and risk bearing capacity, all such tips shall be considered
          as a view or opinion and client shall on his/her discretion decide
          actual trades. We are not associated with any intermediaries and do
          not recommend services of any specific intermediaries.
        </Text>
        <Text style={styles.paragraph}>
          No litigations have been filed against the company since the
          incorporation of the company.
        </Text>
        <Text style={styles.paragraph}>
          All the tips which are suggested by our company are communicated in
          written, no verbal communication from any of the executives or
          otherwise under any circumstances shall be considered as advice by our
          company.
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  paragraph: {
    color: COLORS.darkTransparent,
    textAlign: 'justify',
    fontSize: 13,
    ...FONTS.body4,
    paddingTop: SIZES.padding,
  },
});
