import { useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native"
import { Card, Badge, DataRow, FilterPicker, Input, ErrorMessage, LoadingSpinner } from "../components"
import { usePassengers } from '../hooks/useDataQueries'
import { useTheme } from "../providers/ThemeProvider"
import { createSharedStyles, SPACING_UNIT } from "../styles"

export default function PassengersScreen() {
  const { data: passengers, isLoading, error, refetch } = usePassengers()
  const { t } = useTranslation()
  const { colors } = useTheme()

  const [sortBy, setSortBy] = useState("Pclass")
  const [filterPclass, setFilterPclass] = useState("all")
  const [filterSurvived, setFilterSurvived] = useState("all")
  const [filterName, setFilterName] = useState("")

  const sharedStyles = createSharedStyles(colors)
  const styles = StyleSheet.create({
    ...sharedStyles,
    filterContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingTop: SPACING_UNIT * 2,
      paddingHorizontal: SPACING_UNIT * 2,
      backgroundColor: colors.backgroundColor,
      zIndex: 2,
    },
    list: {
      padding: SPACING_UNIT * 2.5,
      paddingTop: 0,
    },
    sortContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: SPACING_UNIT * 2,
      backgroundColor: colors.backgroundColor,
      zIndex: 1,
    },
    sortLabel: {
      fontSize: 16,
      fontWeight: '500',
      marginRight: SPACING_UNIT,
      color: colors.textColor,
    },
    searchContainer: {
      paddingHorizontal: SPACING_UNIT * 2,
      paddingBottom: SPACING_UNIT * 2,
      backgroundColor: colors.backgroundColor,
    },
  })

  const filteredPassengers = useMemo(() => {
    if (!passengers) return []
    return passengers.filter((p) => {
      const matchPclass = filterPclass === "all" || String(p.Pclass) === filterPclass
      const matchSurvived = filterSurvived === "all" || (filterSurvived === "survived" ? p.Survived : !p.Survived)
      const matchName = p.Name.toLowerCase().includes(filterName.toLowerCase())
      return matchPclass && matchSurvived && matchName
    })
  }, [passengers, filterPclass, filterSurvived, filterName, t])

  const sortedPassengers = useMemo(() => {
    return [...filteredPassengers].sort((a, b) => {
      if (sortBy === "Pclass") return a.Pclass - b.Pclass
      if (sortBy === "Cabin") return (a.Cabin || "").localeCompare(b.Cabin || "")
      return a.Name.localeCompare(b.Name)
    })
  }, [filteredPassengers, sortBy])

  const renderPassenger = ({ item }) => (
    <Card>
      <View style={styles.headerRow}>
        <Text style={styles.name}>{item.Name}</Text>
        <Badge 
          text={item.Survived ? t("survived") : t("didNotSurvive")}
          color={item.Survived ? colors.primary : colors.textColorSecondary}
        />
      </View>
      <View style={styles.details}>
        <DataRow label={t("class")} value={item.Pclass} />
        <DataRow label={t("sex")} value={t(item.Sex)} />
        <DataRow label={t("age")} value={item.Age || t("unknown")} />
        <DataRow label={t("fare")} value={`$${item.Fare ? item.Fare.toFixed(2) : t("na")}`} />
        <DataRow label={t("embarked")} value={item.Embarked || t("unknown")} />
      </View>
    </Card>
  )

  if (isLoading) {
    return <LoadingSpinner message={t("loadingPassengers")} />
  }

  if (error) {
    return <ErrorMessage error={error} onRetry={refetch} />
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.filterContainer}>
        <FilterPicker
          label={t("class")}
          selectedValue={filterPclass}
          onValueChange={setFilterPclass}
          items={[
            { label: t("all"), value: "all" },
            { label: t("one"), value: "1" },
            { label: t("two"), value: "2" },
            { label: t("three"), value: "3" },
          ]}
        />

        <FilterPicker
          label={t("survived")}
          selectedValue={filterSurvived}
          onValueChange={setFilterSurvived}
          items={[
            { label: t("all"), value: "all" },
            { label: t("survived"), value: "survived" },
            { label: t("didNotSurvive"), value: "notSurvived" },
          ]}
        />
      </View>

      <View style={styles.searchContainer}>
        <Input
          label={t("nameLabel")}
          value={filterName}
          onChangeText={setFilterName}
          placeholder={t("searchName")}
        />
      </View>

      <FlatList
        data={sortedPassengers}
        renderItem={renderPassenger}
        keyExtractor={(item, index) => item.PassengerId?.toString() || index.toString()}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        onRefresh={refetch}
        refreshing={isLoading}
      />
    </SafeAreaView>
  )
}
