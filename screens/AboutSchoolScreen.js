import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { Image, StyleSheet, View, Text, ScrollView, Dimensions, TouchableOpacity, Modal } from "react-native"
import { useTheme } from "../providers/ThemeProvider"
import { createSharedStyles, SPACING_UNIT } from "../styles"
import { SafeAreaView } from "react-native-safe-area-context"
import { ScreenHeader, Card } from "../components"
import ImageViewer from "react-native-image-zoom-viewer"

const { width: screenWidth } = Dimensions.get("window")

export default function AboutSchoolScreen() {
  const { t } = useTranslation()
  const { colors } = useTheme()
  const [selectedImageIndex, setSelectedImageIndex] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)

  const schoolImages = [
    {
      id: 1,
      uri: "https://people.vts.su.ac.rs/~probi/MobilProg/vizsga/KE/Ni-4.jpg",
      titleKey: "modernFacilities",
      descriptionKey: "modernFacilitiesDesc"
    },
    {
      id: 2,
      uri: "https://people.vts.su.ac.rs/~probi/MobilProg/vizsga/KE/Ni-6.jpg",
      titleKey: "learningEnvironment",
      descriptionKey: "learningEnvironmentDesc"
    },
    {
      id: 3,
      uri: "https://people.vts.su.ac.rs/~probi/MobilProg/vizsga/KE/Ni-7.jpg",
      titleKey: "givingBack",
      descriptionKey: "givingBackDesc"
    },
    {
      id: 4,
      uri: "https://people.vts.su.ac.rs/~probi/MobilProg/vizsga/KE/Ni-20.jpg",
      titleKey: "supportingCommunity",
      descriptionKey: "supportingCommunityDesc"
    },
    {
      id: 5,
      uri: "https://people.vts.su.ac.rs/~probi/MobilProg/vizsga/KE/Ni-22.jpg",
      titleKey: "modernAmphitheater",
      descriptionKey: "modernAmphitheaterDesc"
    },
    {
      id: 6,
      uri: "https://people.vts.su.ac.rs/~probi/MobilProg/vizsga/KE/Ni-116.jpg",
      titleKey: "studentCollaboration",
      descriptionKey: "studentCollaborationDesc"
    },
    {
      id: 7,
      uri: "https://people.vts.su.ac.rs/~probi/MobilProg/vizsga/KE/Ni-197.jpg",
      titleKey: "hackathons",
      descriptionKey: "hackathonsDesc"
    },
  ]

  const sharedStyles = createSharedStyles(colors)
  const styles = StyleSheet.create({
    ...sharedStyles,
    content: {
      flex: 1,
      padding: SPACING_UNIT * 2,
    },
    subtitle: {
      fontSize: 16,
      color: colors.textColorSecondary,
      lineHeight: 24,
      marginBottom: SPACING_UNIT * 2,
    },
    galleryContainer: {
      flex: 1,
    },
    imageGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
    },
    imageColumn: {
      width: (screenWidth - SPACING_UNIT * 6) / 2,
      marginBottom: SPACING_UNIT * 2,
    },
    imageItem: {
      marginBottom: SPACING_UNIT * 2,
    },
    image: {
      width: "100%",
      height: 200,
      borderRadius: 12,
    },
    imageInfo: {
      paddingVertical: SPACING_UNIT,
    },
    imageTitle: {
      fontSize: 16,
      fontWeight: "600",
      color: colors.textColor,
      marginBottom: SPACING_UNIT * 0.5,
    },
    imageDescription: {
      fontSize: 14,
      color: colors.textColorSecondary,
      lineHeight: 20,
    },
    modalContainer: {
      flex: 1,
      backgroundColor: "black",
    },
    closeButton: {
      position: "absolute",
      top: 50,
      right: 20,
      zIndex: 1000,
      backgroundColor: "rgba(0,0,0,0.5)",
      borderRadius: 20,
      padding: 10,
    },
    closeButtonText: {
      color: "white",
      fontSize: 16,
      fontWeight: "bold",
    },
  })

  const handleImagePress = (index) => {
    setSelectedImageIndex(index)
    setModalVisible(true)
  }

  const closeModal = () => {
    setModalVisible(false)
    setSelectedImageIndex(null)
  }

  const renderImageItem = (image, index) => (
    <TouchableOpacity
      key={image.id}
      style={styles.imageItem}
      onPress={() => handleImagePress(index)}
      activeOpacity={0.8}
    >
      <Card>
        <Image
          source={{ uri: image.uri }}
          style={styles.image}
          contentFit="cover"
          transition={200}
        />
        <View style={styles.imageInfo}>
          <Text style={styles.imageTitle}>{t(image.titleKey)}</Text>
          <Text style={styles.imageDescription}>{t(image.descriptionKey)}</Text>
        </View>
      </Card>
    </TouchableOpacity>
  )

  const renderMasonryGallery = () => {
    const leftColumn = []
    const rightColumn = []

    schoolImages.forEach((image, index) => {
      if (index % 2 === 0) {
        leftColumn.push(renderImageItem(image, index))
      } else {
        rightColumn.push(renderImageItem(image, index))
      }
    })

    return (
      <View style={styles.imageGrid}>
        <View style={styles.imageColumn}>{leftColumn}</View>
        <View style={styles.imageColumn}>{rightColumn}</View>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <ScreenHeader
          subtitle={t("schoolDescription")}
        />

        <View style={styles.galleryContainer}>
          <Text style={styles.subtitle}>
            {t("schoolGallery")}
          </Text>
          {renderMasonryGallery()}
        </View>
      </ScrollView>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
          <ImageViewer
            imageUrls={schoolImages.map(img => ({ url: img.uri }))}
            index={selectedImageIndex}
            onSwipeDown={closeModal}
            enableSwipeDown={true}
            backgroundColor="black"
            renderIndicator={(currentIndex, allSize) => (
              <View style={{
                position: 'absolute',
                top: 55,
                left: 20,
                backgroundColor: 'rgba(0,0,0,0.5)',
                borderRadius: 15,
                paddingHorizontal: 10,
                paddingVertical: 5,
              }}>
                <Text style={{ color: 'white', fontSize: 14 }}>
                  {currentIndex} / {allSize}
                </Text>
              </View>
            )}
          />
        </View>
      </Modal>
    </SafeAreaView>
  )
} 