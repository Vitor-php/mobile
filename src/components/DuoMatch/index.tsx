import React, { useState } from "react";
import { SafeAreaView, Modal, ModalProps, Text, TouchableOpacity, Alert } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { CheckCircle } from "phosphor-react-native";
import * as Clipboard from 'expo-clipboard';

import { styles } from "./styles";
import { THEME } from "../../theme";
import { Heading } from "../Heading";
import { Loading } from "../Loading";

interface Props extends ModalProps {
    discord: string;
    onClose: () => void;
}

export function DuoMatch({ discord, onClose, ...rest }: Props) {
  const [copied, setCopied] = useState(false);

  async function handleCopyDiscord() {
    setCopied(true)
    await Clipboard.setStringAsync(discord);
    Alert.alert('Discord', 'Copiado com sucesso!');
    setCopied(false)
  }

  return (
    <Modal
        animationType="fade"
        transparent
        statusBarTranslucent
        {...rest}
    >
      <SafeAreaView style={styles.container}>
        <SafeAreaView style={styles.content}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={onClose}
          >
            <MaterialIcons
              name="close"
              size={20}
              color={THEME.COLORS.CAPTION_500}
            />
          </TouchableOpacity>

          <CheckCircle
            size={64}
            color={THEME.COLORS.SUCCESS}
            weight="bold"
          />

          <Heading
            title="Let's play!"
            subtitle="Agora é só jogar!"
            style={styles.heading}
          />

          <Text style={styles.label}>
            Adicione no Discord:
          </Text>

        <TouchableOpacity 
          style={styles.discordButton}
          onPress={handleCopyDiscord}
          disabled={copied}
        >
          <Text style={styles.discord}>
            {copied ? <Loading/> : discord}
          </Text>
        </TouchableOpacity>
    
        </SafeAreaView>
      </SafeAreaView>
    </Modal>
  );
}
